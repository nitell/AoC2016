using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Dec13
{
    class Map
    {
        private MapCoordinate[,] rows;

        public Map(int size)
        {
            rows = new MapCoordinate[size, size];
            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    rows[i, j] = new MapCoordinate(i, j);
        }

        public MapCoordinate this[int x, int y] => rows[x, y];

        public MapCoordinate GetDestination(int x, int y, Direction direction)
        {
            switch (direction)
            {
                case Direction.Up:
                    return this[x, y - 1];
                case Direction.Down:
                    return this[x, y + 1];
                case Direction.Left:
                    return this[x - 1, y];
                case Direction.Right:
                    return this[x + 1, y];
            }
            return this[0, 0];
        }
    }


    class MapCoordinate
    {
        public int X { get; set; }
        public int Y { get; set; }

        public bool IsObstacle { get; }


        public MapCoordinate(int x, int y)
        {
            X = x;
            Y = y;

            var val = X * X + 3 * X + 2 * X * Y + Y + Y * Y + 1352;
            var bitarray = new BitArray(System.BitConverter.GetBytes(val));
            IsObstacle = bitarray.Cast<bool>().Count(b => b) % 2 == 1;
        }

        public int GetManhattanDistanceTo(MapCoordinate target)
        {
            return Math.Abs(X - target.X) + Math.Abs(target.Y - Y);
        }
    }

    enum Direction
    {
        Up,
        Down,
        Left,
        Right
    }

    class Program
    {
        private static Map map;

        public static MapCoordinate[] FindShortestPath(MapCoordinate start, MapCoordinate target)
        {
            // The set of nodes already evaluated.
            var closedSet = new HashSet<MapCoordinate>();
            // The set of currently discovered nodes still to be evaluated.
            // Initially, only the start node is known.
            var openSet = new HashSet<MapCoordinate> { start };
            // For each node, which node it can most efficiently be reached from.
            // If a node can be reached from many nodes, cameFrom will eventually contain the
            // most efficient previous step.
            var cameFrom = new Dictionary<MapCoordinate, MapCoordinate>();
            // For each node, the cost of getting from the start node to that node.
            var gScore = new Dictionary<MapCoordinate, int>();
            // The cost of going from start to start is zero.
            gScore[start] = 0;
            // For each node, the total cost of getting from the start node to the goal
            // by passing by that node. That value is partly known, partly heuristic.
            var fScore = new Dictionary<MapCoordinate, int>();
            // For the first node, that value is completely heuristic.
            fScore[start] = start.GetManhattanDistanceTo(target);

            while (openSet.Any())
            {
                //the node in openSet having the lowest fScore[] value
                var current = openSet.OrderBy(n => fScore.ContainsKey(n) ? fScore[n] : int.MaxValue).First();
                if (current.Equals(target))
                    return ReconstructPath(cameFrom, current);
                openSet.Remove(current);
                closedSet.Add(current);
                foreach (var neighbor in GetNeighbours(current))
                {
                    if (closedSet.Contains(neighbor))
                        continue; // Ignore the neighbor which is already evaluated.
                    // The distance from start to a neighbor
                    var tentativeScore = gScore[current];
                    if (!openSet.Contains(neighbor)) // Discover a new node
                        openSet.Add(neighbor);
                    else if (tentativeScore >= gScore[neighbor])
                        continue; // This is not a better path.

                    // This path is the best until now. Record it!
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentativeScore;
                    fScore[neighbor] = gScore[neighbor] + neighbor.GetManhattanDistanceTo(target);
                }
            }
            return null;
        }

        public static IEnumerable<MapCoordinate> GetNeighbours(MapCoordinate current)
        {
            foreach (Direction direction in Enum.GetValues(typeof(Direction)))
            {
                var destination = map.GetDestination(current.X, current.Y, direction);
                if (destination.X >= 0 && destination.Y >= 0 && !destination.IsObstacle)
                    yield return destination;
            }
        }

        private static MapCoordinate[] ReconstructPath(Dictionary<MapCoordinate, MapCoordinate> cameFrom, MapCoordinate current)
        {
            var list = new List<MapCoordinate>();
            while (cameFrom.Keys.Contains(current))
            {
                list.Add(current);
                current = cameFrom[current];
            }
            list.Reverse();
            return list.ToArray();
        }



        static void Main(string[] args)
        {
            map = new Map(50);
            for (int y = 0; y < 10; y++)
            {
                Console.WriteLine();
                for (int x = 0; x < 10; x++)
                    Console.Write(map[x, y].IsObstacle ? "#" : ".");
            }
            var result = FindShortestPath(map[1, 1], map[31, 39]);
            Console.WriteLine(result.Length);
        }
    }
}
