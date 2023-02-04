import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const endpoint = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=exercise`;

const ExerciseCard = ({ exercise }) => {
	const [gifUrl, setGifUrl] = useState("");

	useEffect(() => {
		fetch(endpoint)
			.then((response) => response.json())
			.then((data) => {
				setGifUrl(data.data.images.original.url);
			});
	}, []);

	return (
		<Link className='exercise-card' to={`/exercise/${exercise.name}`}>
			<img src={gifUrl} alt={exercise.name} loading='lazy' />
			<Stack direction='row'>
				<Button
					sx={{
						ml: "21px",
						color: "#fff",
						background: "#FFA9A9",
						fontSize: "14px",
						borderRadius: "20px",
						textTransform: "capitalize",
					}}
				>
					{exercise.equipment}
				</Button>
				<Button
					sx={{
						ml: "21px",
						color: "#fff",
						background: "#FCC757",
						fontSize: "14px",
						borderRadius: "20px",
						textTransform: "capitalize",
					}}
				>
					{exercise.muscle}
				</Button>
			</Stack>
			<Typography
				ml='21px'
				color='#000'
				fontWeight='bold'
				sx={{ fontSize: { lg: "24px", xs: "20px" } }}
				mt='11px'
				pb='10px'
				textTransform='capitalize'
			>
				{exercise.name}
			</Typography>
		</Link>
	);
};

export default ExerciseCard;
