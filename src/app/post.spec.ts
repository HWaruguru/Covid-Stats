import { Post } from './post';

describe('Post', () => {
  it('should create an instance', () => {
    expect(new Post(1, 'Kenya', 20, 30, 10, 4, new Date(2021,7, 20))).toBeTruthy();
  });
});
