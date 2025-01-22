export default function ProjectCardSkeleton() {
    return (
      <div className="grid md:grid-cols-2 gap-8 items-center animate-pulse">
        <div className="space-y-6">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          
          <div className="space-y-4">
            <div className="flex gap-16">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-300"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
        
        <div className="h-[400px] bg-gray-300 rounded-lg"></div>
      </div>
    )
  }  