import type { ExampleProgram } from './types';

export const EXAMPLE_PROGRAMS: ExampleProgram[] = [
  {
    name: 'Addition',
    description: 'Add two secret integers',
    code: `from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")
    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))
    new_int = my_int1 + my_int2
    return [Output(new_int, "my_output", party1)]
`,
    inputs: [
      { name: 'my_int1', type: 'SecretInteger', value: 5, party: 'Party1' },
      { name: 'my_int2', type: 'SecretInteger', value: 3, party: 'Party1' },
    ],
  },
  {
    name: 'Multiplication',
    description: 'Multiply two secret integers',
    code: `from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")
    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))
    new_int = my_int1 * my_int2
    return [Output(new_int, "my_output", party1)]
`,
    inputs: [
      { name: 'my_int1', type: 'SecretInteger', value: 4, party: 'Party1' },
      { name: 'my_int2', type: 'SecretInteger', value: 7, party: 'Party1' },
    ],
  },
  {
    name: 'Comparison',
    description: 'Compare two secret integers',
    code: `from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")
    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))
    result = my_int1 > my_int2
    return [Output(result, "my_output", party1)]
`,
    inputs: [
      { name: 'my_int1', type: 'SecretInteger', value: 10, party: 'Party1' },
      { name: 'my_int2', type: 'SecretInteger', value: 5, party: 'Party1' },
    ],
  },
  {
    name: 'Voting',
    description: 'Simple voting program',
    code: `from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")
    party2 = Party(name="Party2")
    vote1 = SecretInteger(Input(name="vote1", party=party1))
    vote2 = SecretInteger(Input(name="vote2", party=party2))
    total = vote1 + vote2
    return [Output(total, "total_votes", party1)]
`,
    inputs: [
      { name: 'vote1', type: 'SecretInteger', value: 1, party: 'Party1' },
      { name: 'vote2', type: 'SecretInteger', value: 1, party: 'Party2' },
    ],
  },
  {
    name: 'Subtraction',
    description: 'Subtract two secret integers',
    code: `from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")
    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))
    new_int = my_int1 - my_int2
    return [Output(new_int, "my_output", party1)]
`,
    inputs: [
      { name: 'my_int1', type: 'SecretInteger', value: 20, party: 'Party1' },
      { name: 'my_int2', type: 'SecretInteger', value: 8, party: 'Party1' },
    ],
  },
];