using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dec11
{
    enum ThingType
    {
        Chip,
        Generator
    }



    class State
    {
        public int[] Things { get; set; }
        public int ElevatorFloor { get; set; }
        public State Previous { get; set; }

        public State(int[] things, int elevatorFloor, State previous)
        {
            Things = things;
            ElevatorFloor = elevatorFloor;
            Previous = previous;
            Steps = Previous?.Steps + 1 ?? 0;
            Hash = ElevatorFloor + String.Join("", things);
            IsFinalState = Things.All(f => f == 3);

        }

        public string Hash { get; }
        public bool IsFinalState { get; }

        public bool IsValid
        {
            get
            {
                //Is invalid if chip on floor is not connected to it's generator
                //and generator is on floor
                for (int i = 0; i < Things.Length / 2; i++)
                {
                    if (Things[i] != Things[Things.Length / 2 + i] && Things.Skip(Things.Length / 2).Contains(Things[i]))
                        return false;
                }
                return true;
            }
        }

        public int Steps { get; }

        public IEnumerable<State> Path => Previous == null ? new[] { this } : Previous.Path.Concat(new[] { this });
    }




    public class Program
    {
        public static void Main()
        {
            //var initialState = new State(new[] { 0, 0, 1, 2 }, 0, null);
            var initialState = new State(new[] { 0, 1, 1, 2, 2, 0, 0, 0, 2, 2 }, 0, null);
          

            var solution = Solve(initialState);
            Console.WriteLine(solution.Steps);
            Console.ReadLine();
        }

        private static State Solve(State initialState)
        {
            var exploredStates = new HashSet<string>();

            var queue = new Queue<State>();
            queue.Enqueue(initialState);

            State state = null;
            while ((state = queue.Dequeue()) != null)
            {
                Console.WriteLine($"Testing state with {state.Steps} steps, {exploredStates.Count} known states");
                if (state.IsFinalState)
                {
                    return state;
                }

                foreach (var newState in GetValidUnexploredStates(exploredStates, state))
                    queue.Enqueue(newState);
            }

            throw new Exception("WTF???");
        }

        private static IEnumerable<State> GetValidUnexploredStates(HashSet<string> exploredStates, State state)
        {
            var possibleStates = GetNextPossibleStates(state);
            var result = possibleStates.Where(s => !exploredStates.Contains(s.Hash)).ToArray();

            foreach (var hash in result.Select(r => r.Hash))
                exploredStates.Add(hash);
            return result.Where(r => r.IsValid).ToArray();
        }

        private static IEnumerable<State> GetNextPossibleStates(State state)
        {
            //We can just move the elevator up and down empty
            foreach (int move in new[] { -1, 1 })
            {
                var newFloor = state.ElevatorFloor + move;
                if (newFloor >= 0 && newFloor < 4)
                {
                    //Move one thing
                    for (int i = 0; i < state.Things.Length; i++)
                    {
                        if (state.Things[i] == state.ElevatorFloor)
                        {
                            var target = new int[state.Things.Length];
                            Array.Copy(state.Things, target, target.Length);
                            target[i] = newFloor;
                            yield return new State(target, newFloor, state);
                        }
                    }


                    //Move two things
                    for (int i = 0; i < state.Things.Length - 1; i++)
                        for (int j = 1; j < state.Things.Length; j++)
                        {
                            if (state.Things[i] == state.ElevatorFloor && state.Things[j] == state.ElevatorFloor)
                            {
                                var target = new int[state.Things.Length];
                                Array.Copy(state.Things, target, target.Length);
                                target[i] = newFloor;
                                target[j] = newFloor;
                                yield return new State(target, newFloor, state);

                            }
                        }
                }
            }

        }
    }
}
