import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState([]);

	useEffect(() => {
		const fetchExercisesData = () => {
			const bodyPartsData = [
				"abdominals",
				"abductors",
				"adductors",
				"biceps",
				"calves",
				"chest",
				"forearms",
				"glutes",
				"hamstrings",
				"lats",
				"lower_back",
				"middle_back",
				"neck",
				"quadriceps",
				"traps",
				"triceps",
			];
			setBodyParts(["All", ...bodyPartsData]);
		};
		fetchExercisesData();
	}, []);

	const handlesearch = async () => {
		if (search) {
			const exercisesData = await fetchData(
				"https://api.api-ninjas.com/v1/exercises?muscle=" + search,
				exerciseOptions
			);

			console.log(exercisesData);

			const searchedExercises = exercisesData.filter(
				(item) =>
					item.name.toLowerCase().includes(search) ||
					item.type.toLowerCase().includes(search) ||
					item.equipment.toLowerCase().includes(search) ||
					item.muscle.toLowerCase().includes(search)
			);

			window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

			setSearch("");
			setExercises(searchedExercises);
		}
	};

	return (
		<Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
			<Typography
				fontWeight={700}
				sx={{ fontSize: { lg: "44px", xs: "30px" } }}
				mb='50px'
				textAlign='center'
			>
				Aweseome Exercises You <br /> Should Know
			</Typography>
			<Box position='relative' mb='72px'>
				<TextField
					sx={{
						input: { fontWeight: "700", border: "None", borderRadius: "4px" },
						width: { lg: "800px", xs: "350px" },
						backgroundColor: "#fff",
						borderRadius: "40px",
					}}
					height='76px'
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					placeholder='Search Exercises'
					type='text'
				/>
				<Button
					className='search-btn'
					sx={{
						background: "#FF2625",
						color: "#fff",
						textTransform: "none",
						width: { lg: "175px", xs: "80px" },
						fontSize: { lg: "20px", xs: "14px" },
						height: "56px",
						position: "absolute",
						right: "0",
					}}
					onClick={handlesearch}
				>
					Search
				</Button>
			</Box>
			<Box sx={{ position: "relative", width: "100%", p: "20px" }}>
				<HorizontalScrollbar
					data={bodyParts}
					bodyParts
					setBodyPart={setBodyPart}
					bodyPart={bodyPart}
				/>
			</Box>
		</Stack>
	);
};

export default SearchExercises;
