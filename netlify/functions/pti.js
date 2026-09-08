exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        error: "POST method required"
      })
    };
  }

  try {
    const { image, prompt } = JSON.parse(event.body || "{}");

    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Image is required"
        })
      };
    }

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Prompt is required"
        })
      };
    }

    return {
      statusCode: 501,
      body: JSON.stringify({
        success: false,
        error: "AI image provider is not connected yet"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Invalid request"
      })
    };
  }
};
