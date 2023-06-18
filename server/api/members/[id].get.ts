export default defineEventHandler(async (event) => {

  return {
    classId: event.context.params.id 
  }
})
