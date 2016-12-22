using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Dec17
{
    class Map
    {
        public int Size { get; set; }
        private MapCoordinate[,] rows;

        public Map(int size)
        {
            Size = size;
            rows = new MapCoordinate[size, size];
            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    rows[i, j] = new MapCoordinate(i, j);
        }

        public MapCoordinate this[int x, int y] => rows[x, y];

        public Position GetDestination(Position p, Direction direction)
        {
            try
            {
                MapCoordinate c = this[0, 0];
                switch (direction)
                {
                    case Direction.Up:
                        c = this[p.Coordinate.X, p.Coordinate.Y - 1];
                        break;
                    case Direction.Down:
                        c = this[p.Coordinate.X, p.Coordinate.Y + 1];
                        break;
                    case Direction.Left:
                        c = this[p.Coordinate.X - 1, p.Coordinate.Y];
                        break;
                    case Direction.Right:
                        c = this[p.Coordinate.X + 1, p.Coordinate.Y];
                        break;
                }
                return new Position(c, p.History + direction.ToString().Substring(0, 1));
            }
            catch
            {
                return null;
            }
        }
    }

    class MapCoordinate
    {
        

        public MapCoordinate(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; set; }
        public int Y { get; set; }

        public bool IsObstacle { get; }       

        public int GetManhattanDistanceTo(MapCoordinate target)
        {
            return Math.Abs(X - target.X) + Math.Abs(target.Y - Y);
        }
    }

    class Position
    {
        public MapCoordinate Coordinate { get; set; }
        public string History { get; set; }   

        public Position(MapCoordinate coordinate, string history)
        {
            Coordinate = coordinate;
            History = history;
        }
    }

    enum Direction
    {
        Up = 0,
        Down = 1,
        Left = 2,
        Right =3
    }

    class Program
    {
        private static Map map;
        public static string Input = "lpvhkcbi";
        public static Position FindShortestPath(Position start, MapCoordinate target)
        {
                        
            // The set of currently discovered nodes still to be evaluated.
            // Initially, only the start node is known.
            var openSet = new HashSet<Position> { start };                   
            // For each node, the total cost of getting from the start node to the goal
            // by passing by that node. That value is partly known, partly heuristic.
            var fScore = new Dictionary<Position, int>();
            // For the first node, that value is completely heuristic.
            fScore[start] = start.Coordinate.GetManhattanDistanceTo(target);

            while (openSet.Any())
            {
                //the node in openSet having the lowest fScore[] value
                var current = openSet.OrderBy(n => n.History.Length).FirstOrDefault();
                if (current.Coordinate.Equals(target))
                    return current;
                openSet.Remove(current);                
                foreach (var neighbor in GetNeighbours(current))
                {      
                    // The distance from start to a neighbor                   
                    if (!openSet.Contains(neighbor)) // Discover a new node
                        openSet.Add(neighbor);                    
                }
            }
            return null;
        }

        public static IEnumerable<Position> GetNeighbours(Position current)
        {
            foreach (Direction direction in Enum.GetValues(typeof(Direction)))
            {
                var destination = map.GetDestination(current, direction);
                if (destination != null)
                { 
                    var hash = CreateMD5(Input + current.History);
                    if (IsOpen(hash[(int) direction]))
                        yield return destination;
                }
                    
            }
        }

        private static bool IsOpen(char c)
        {
            switch (c)
            {
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                    return true;
                default:
                    return false;
            }
        }

        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }


        static void Main(string[] args)
        {
            map = new Map(4);            
            var result = FindShortestPath(new Position(map[0, 0],String.Empty), map[3, 3]);
            Console.WriteLine(result.History);
        }
    }
}
