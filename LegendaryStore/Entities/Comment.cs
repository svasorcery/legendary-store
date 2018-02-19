﻿using System;

namespace LegendaryStore.Entities
{
    public class Comment
    {
        public long Id { get; set; }
        public int ProductId { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime PostedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
