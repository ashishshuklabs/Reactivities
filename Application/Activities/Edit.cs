using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime ? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities.FindAsync(request.Id);
                if (activity == null) {
                    throw new Exception("Entry not found");
                }
                activity.Venue = request.Venue ?? activity.Venue;
                activity.Title = request.Title ?? activity.Venue;
                activity.Date = request.Date ?? activity.Date;
                activity.Description = request.Description ?? activity.Description;
                activity.City = request.City ?? activity.City;
                activity.Category = request.Category ?? activity.Category;
                //this.context.Add(activity);
                bool success = await this.context.SaveChangesAsync() > 0;
                if(!success){
                    throw new Exception("Cannot save data");
                }
                return Unit.Value;
            }
        }
    }
}