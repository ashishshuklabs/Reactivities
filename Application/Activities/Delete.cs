using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities {
    public class Delete {

        public class Command : IRequest { 
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;

            public Handler(DataContext context) {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken) {
                // handler logic goes here
                var activity = await this.context.Activities.FindAsync(request.Id);
                if(activity == null){
                    throw new Exception("No activity found");
                }
                this.context.Activities.Remove(activity);
                int success = await this.context.SaveChangesAsync();
                if (success < 0) {
                    throw new Exception("Could not create entry");
                }
                return Unit.Value;
            }
        }

    }
}