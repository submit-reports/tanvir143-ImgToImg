exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        status: 405,
        author: "Tanvir143",
        error: "POST method required"
      })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const {
      prompt,
      imageBase64,
      ratio = "auto"
    } = body;

    if (!imageBase64) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          status: 400,
          author: "Tanvir143",
          error: "imageBase64 is required"
        })
      };
    }

    if (!prompt || typeof prompt !== "string") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          status: 400,
          author: "Tanvir143",
          error: "prompt is required"
        })
      };
    }

    const response = await fetch(
      "https://ahm7xmakki.com/api/pti",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          imageBase64,
          ratio
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.imageUrl) {
      return {
        statusCode: response.status || 500,
        headers,
        body: JSON.stringify({
          success: false,
          status: response.status || 500,
          author: "Tanvir143",
          error: data.error || "Image generation failed"
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        status: 200,
        author: "Tanvir143",
        type: "image-to-image",
        prompt,
        ratio,
        imageUrl: data.imageUrl,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error("Tanvir143 PTI Error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        status: 500,
        author: "Tanvir143",
        error: "Internal server error"
      })
    };
  }
};
