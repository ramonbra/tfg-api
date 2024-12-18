export const createProfessor = async( request, response ) => {
    console.log(request.body);
        response.status(200).json(1);
}