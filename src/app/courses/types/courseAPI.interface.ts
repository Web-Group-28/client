export interface CourseAPIInterface {
   data: [
      {
         _id: String,
         courseID: String,
         title: String,
         parts: [String]
      }
   ],
   meta: {
      code: number
   }
}