// Mock the db module and its functions
  
  // Import your dependencies
  import  db from '../src/database/index';
  import { createComment } from '../src/service/comment.service';
  import { createCommentQuery } from '../src/database/comment.model';
  
  jest.mock('../src/database/index', () => {
    return {
      one: jest.fn(),
      // other methods, if any
    };
  });
  // Test suite
  describe('createComment', () => {
    
    // Reset all mock implementations after each test
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    // Test cases
    it('should throw an error if content is missing', async () => {
      await expect(createComment({ content: '', user_id: '1', post_id: '1' })).rejects.toThrow('Content, user_id and post_id are required');
    });
  
    it('should throw an error if user_id is missing', async () => {
      await expect(createComment({ content: 'content', user_id: '', post_id: '1' })).rejects.toThrow('Content, user_id and post_id are required');
    });
  
    it('should throw an error if post_id is missing', async () => {
      await expect(createComment({ content: 'content', user_id: '1', post_id: '' })).rejects.toThrow('Content, user_id and post_id are required');
    });
  
    it('should create a comment if all required fields are present', async () => {
      // Mocking the db.one function
      (db.one as jest.MockedFunction<typeof db.one>).mockResolvedValue({ id: '2', content: 'content', user_id: '1', post_id: '1' });
  
      const comment = await createComment({ content: 'content', user_id: '1', post_id: '1' });
  
      expect(comment).toEqual({ id: '2', content: 'content', user_id: '1', post_id: '1' });
      expect(db.one).toHaveBeenCalledWith(createCommentQuery, ['content', '1', '1']);
    });
    
    it('should propagate the error if the database operation fails', async () => {
      // Mocking the db.one function to throw an error
      (db.one as jest.MockedFunction<typeof db.one>).mockRejectedValue(new Error('Database error'));
  
      await expect(createComment({ content: 'content', user_id: '1', post_id: '1' })).rejects.toThrow('Database error');
    });
  });
  