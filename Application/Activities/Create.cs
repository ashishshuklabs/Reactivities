using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create {

        public class Command: IRequest{
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }    
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        };
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;

            public Handler(DataContext context) {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = this.context.Activities.Add(
                    new Activity{
                        Id = request.Id,
                        Title = request.Title,
                        Date = request.Date,
                        Description = request.Description,
                        Venue = request.Venue,
                        City = request.City,
                        Category = request.Category,
                    }
                );
                int success = await this.context.SaveChangesAsync();
                if(success < 0){
                    throw new Exception("Could not create entry");
                }
                return Unit.Value;
            }
        }

    }
}