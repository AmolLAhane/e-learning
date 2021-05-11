﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using E_Learning.Application.Common.Exceptions;
using E_Learning.Application.Common.Interfaces;
using E_Learning.Domain.Entities;
using Infrastructure.Identity;
using Infrastructure.Identity.dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace E_Learning.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IIdentityService _identityService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IIdentityService identityService)
        {
            _userManager = userManager;
            _identityService = identityService;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await _identityService.UserExist(registerDto.Email))
            {
                return BadRequest("Username already exists");
            }


            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);



            if (!result.Succeeded)
            {
                return BadRequest();
            }


            await _userManager.AddToRoleAsync(user, "User");


            return new UserDto
            {
                Token = await _identityService.GenerateToken(user),
                Email = user.Email,
                UserId = user.Id,
                Roles = await _userManager.GetRolesAsync(user)
            };



        }



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }


            return new UserDto
            {
                Token = await _identityService.GenerateToken(user),
                Email = user.Email,
                UserId = user.Id,
                Roles = await _userManager.GetRolesAsync(user)
            };

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userId = _identityService.GetUserId();

            var user = await _userManager.FindByIdAsync(userId);


            if (user == null)
            {
                throw new NotFoundException(userId);
            }


            return new UserDto
            {
                Token = await _identityService.GenerateToken(user),
                Email = user.Email,
                Roles = await _userManager.GetRolesAsync(user)
            };
        }


        [HttpPost("roles")]
        public async Task<ActionResult> CreateNewRoles(RoleDto role)
        {
            var alreadyExists = await _roleManager.RoleExistsAsync(role.Name);

            if (alreadyExists)
            {
                throw new Exception("Role is already exist!");
            }

            var newRole = new IdentityRole
            {
                Name = role.Name
            };

            await _roleManager.CreateAsync(newRole);


            return Ok("Roles success create");
        }

    }


}
