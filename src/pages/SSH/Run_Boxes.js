import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}))

export default function Instrutions({ OS }) {
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(true)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
					>
						<ExpandMoreIcon />
					</IconButton>
				}
				title='Running instructions'
				subheader={
					OS === 'windows'
						? 'On Windows'
						: OS === 'mac'
						? 'On a Mac'
						: 'On Linux'
				}
			/>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<p style={{ margin: '10px 0' }}>Make a directory (Optional)</p>
					<div className='code'>
						{/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
						{OS === 'windows' ? (
							<>
								$ powershell
								<br />
							</>
						) : (
							<></>
						)}
						$ mkdir parallel_programs<br></br>$ cd parallel_programs
					</div>
					<p style={{ margin: '10px 0' }}>Download the file from the source*</p>
					<div className='code'>
						{/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
						$ curl
						"https://firebasestorage.googleapis.com/v0/b/letshpc2.appspot.com/o/topic1.c?alt=media&token=b3b5c202-7f3a-4359-b7b9-f352ceca5ea2"
						-o topic1.c
					</div>
					{OS === 'windows' ? (
						<>
							<p style={{ margin: '10px 0' }}>Compile the program*</p>
							<div className='code'>gcc -fopenmp topic1.c -o res</div>
							<p style={{ margin: '10px 0' }}>Run the program*</p>
							<div className='code'>res</div>
						</>
					) : (
						<>
							<p style={{ margin: '10px 0' }}>
								To see and change the code as per your liking open the code
								using (Optional)
							</p>
							<div className='code'>
								{/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
								$ nano topic1.c
							</div>
							<p style={{ margin: '10px 0' }}>Run the program*</p>
							<div className='code'>
								{/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
								{OS === 'mac' ? (
									<>
										$ clang -Xpreprocessor -fopenmp -lomp topic1.c<br></br>$
										./a.out
									</>
								) : (
									<>
										$ gcc -otopic1 -fopenmp topic1.c<br></br>$ ./topic1
									</>
								)}
							</div>
						</>
					)}
				</CardContent>
			</Collapse>
		</Card>
	)
}
