using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LegendaryStore.Entities;

namespace LegendaryStore.Services
{
    public partial class StoreDbService
    {
        public Task<Comment[]> GetCommentsAsync(int productId)
        {
            return _storeDb.Comments
                .Where(x => x.ProductId == productId && x.IsDeleted == false)
                .ToArrayAsync();
        }

        public Task<Comment[]> GetCommentsAsync(int productId, string userName)
        {
            return _storeDb.Comments
                .Where(x => x.ProductId == productId && x.Author == userName && x.IsDeleted == false)
                .ToArrayAsync();
        }

        public Task<Comment> GetCommentAsync(long id)
        {
            return _storeDb.Comments
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
        }

        public async Task<Comment> CreateCommentAsync(Comment model)
        {
            model.Author = _userService.GetUserName();
            model.PostedAt = DateTime.UtcNow;
            model.IsDeleted = false;

            var comment = _storeDb.Add(model).Entity;
            await _storeDb.SaveChangesAsync();

            return comment;
        }

        public async Task UpdateCommentContentAsync(long id, string content)
        {
            var update = await GetCommentAsync(id);

            update.Content = content;

            _storeDb.Update(update);
            await _storeDb.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(long id)
        {
            var comment = await GetCommentAsync(id);

            comment.IsDeleted = true;

            _storeDb.Update(comment);
            await _storeDb.SaveChangesAsync();
        }
    }
}
