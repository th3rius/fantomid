import { random } from "@lukeed/csprng";

const EPOCH = new Date("2024-09-08");

export function fantomid() {
  const TIMESTAMP_LENGTH = 36;
  const RANDOM_BITS_LENGTH = 17;
  const TIMESTAMP_PRECISION_DIVIDER = 100;

  const bits = Array(TIMESTAMP_LENGTH + RANDOM_BITS_LENGTH);

  // Generates a timestamp to be part of the key. This is
  // inspired by how UUID v7 works: the idea is that this
  // will guarantee keys are generated evenly across time.
  const timestamp = Math.round(
    // Use a more recent base date instead of the Unix Epoch to
    // increase the amount of time we can represent in the timestamp.
    (new Date() - EPOCH) /
      // Decrease the precision of the timestamp to
      // increase the amount of bits we can fit in a key.
      TIMESTAMP_PRECISION_DIVIDER,
  );
  for (let i = 0; i < TIMESTAMP_LENGTH; i++) {
    bits[TIMESTAMP_LENGTH + RANDOM_BITS_LENGTH - 1 - i] = (timestamp >> i) & 1;
  }

  // Generates a randomized part of the key. If multiple machines generate a
  // key at the exact same time (limited by the precision of the timestamp),
  // we are ensured to have a chance of collision of `1` in `2 ** RANDOM_BITS_LENGTH`.
  const randomBytes = random(Math.ceil(RANDOM_BITS_LENGTH / 8));
  for (let i = 0; i < RANDOM_BITS_LENGTH; i++) {
    bits[RANDOM_BITS_LENGTH - 1 - i] =
      (randomBytes[Math.floor(i / 8)] >> i % 8) & 1;
  }

  return Number("0b" + bits.reduce((id, bit) => id + bit, String()));
}
