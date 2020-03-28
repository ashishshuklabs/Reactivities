using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static Application.Activities.Create;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ActivitiesController: ControllerBase
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator) {
            this.mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(){
            return await this.mediator.Send(new List.Query());
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> Details(Guid Id){
            return await this.mediator.Send(new Details.Query(){Id = Id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody]Create.Command command){
            return await this.mediator.Send(command);
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult<Unit>> Edit(Guid Id,[FromBody] Edit.Command command){
            command.Id = Id;
            return await this.mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid Id){
            return await this.mediator.Send(new Delete.Command(){Id = Id});
        }
    }
}