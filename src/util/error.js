module.exports = {
    serverError(res, error) {
      console.log(error);
      res.status(500).json({
        message: "Server Error Occurred"
      });
      },
      resourceError(res, message) {
          res.status(200).json({
          message
      });
      }
  };