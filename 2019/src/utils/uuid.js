let count = 0;
export function uuid() {
  count += 1;
  return 'uuid' + count;
}
