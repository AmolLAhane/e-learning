﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using E_Learning.Application.Lessons.Queries.GetLessons;
using MediatR;

namespace E_Learning.Application.Lessons.Commands
{
   public class CreateLessonCommand : IRequest<LessonDto>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string VideoUrl { get; set; }

    }
}
