﻿using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using E_Learning.Application.Common.Dto;
using E_Learning.Application.Common.Interfaces;
using E_Learning.Domain.Entities;
using MediatR;

namespace E_Learning.Application.Courses.Commands
{
    public class CreateCourseCommand : IRequest<CourseDto>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string VideoUrl { get; set; }

    }


    public class CreateCourseHandler : IRequestHandler<CreateCourseCommand, CourseDto>
    {
        private readonly IContext _context;
        private readonly IMapper _mapper;

        public CreateCourseHandler(IContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CourseDto> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
        {
            var course = new Course
            {
                Title = request.Title,
                Description = request.Description,
                VideoUrl = request.VideoUrl
            };



            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return _mapper.Map<Course, CourseDto>(course);
        }
    }

}