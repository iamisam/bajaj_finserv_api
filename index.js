import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// parse json
app.use(express.json());

// POST route
app.post("/bfhl", (req, res) => {
  try {
    // destructure data array
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: "isam_abdul_aziz_26042004",
        error: "Invalid input: 'data' must be an array.",
      });
    }

    const user_id = "isam_abdul_aziz_26042004";
    const email = "isamabdul.aziz2022@vitstudent.ac.in";
    const roll_number = "22BKT0103";

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphabet_chars = "";

    data.forEach((item) => {
      if (!isNaN(item) && isFinite(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphabet_chars += item;
      } else {
        special_characters.push(item);
      }
    });

    const reversed_alphabets = alphabet_chars.split("").reverse().join("");
    let concat_string = "";
    for (let i = 0; i < reversed_alphabets.length; i++) {
      if (i % 2 === 0) {
        concat_string += reversed_alphabets[i].toUpperCase();
      } else {
        concat_string += reversed_alphabets[i].toLowerCase();
      }
    }

    // final response after processing
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum.toString(),
      concat_string: concat_string,
    };

    // send response
    return res.status(200).json(response);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      is_success: false,
      user_id: "isam_abdul_aziz_26042004",
      error: "An internal server error occurred.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
