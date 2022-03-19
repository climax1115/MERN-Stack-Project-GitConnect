# MERN-Stack-Project-GitConnect

# GitConnect
> Network with developers, share your experience, skills, and projects.  

## Table of contents
* [General info](#general-info)
* [Project Link](#project-link)
* [Project Video](#project-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
GitConnect is a social media application connecting users to a network of developers alike. This is a unique site allowing incoming developers to showcase their projects, experience, and talents to other developers and managers.  

<div align="center">Welcome to GitConnect. </div>
<br/>
<div align="center">
<kbd>
<img src="./gitconnectlanding.PNG">
</kbd>
</div>

<br/>
<div align="center">
<kbd>
<img src="./profilepage.PNG">
</kbd>
</div>

## Project Link 
[Click to view](https://gitconnect-app.herokuapp.com/)

## Technologies
### Backend Development 
* Node.js - version 14.6.0
* Express - version 4.17.1
* Gravatar - version 1.8.1
* JWT - version 8.5.1
* Mongoose - version 5.10.0
* Request - version 2.88.2

### Frontend Development 
* JavaScript (ES6)
* HTML5
* CSS3
* React.js - version 16.13.1
* Redux - version 4.0.5
* React-DOM - version 16.13.1
* React-Moment - version 0.9.7
* React-Redux - version 7.2.1
* React-Router-DOM - version 5.2.0
* React-Scripts - version 3.4.3
* React-DevTools-Extension - version 2.13.8
* Redux-Thunk - version 2.3.0
* UUID - version 8.3.0

## Setup
To try out this project: 
1. Clone the GitHub repository locally to your computer
1. In the command line, navigate to the root directory of the repository, and type the following: 
  $ npm install 
1. Navigate to the client folder, and in the root directory of the client folder, type the following: 
  $ npm install 
1. Navigate back to the root directory of this project "/GitConnect" and start the server by typing the following: 
  $ npm run dev 

## Code Examples
### Node.js/Express.js
```Node
//Route: GET api/auth 
//Details: Test route 
//Access: Private 
//adds middleware 'auth' to verify for jwt authorization and decode it to check for validation 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //leave off the password
        res.json(user); //return user data back  
    } catch(err) {
        console.error(err.message); 
        res.status(500).send('Server Error')
    }
})
```

### JavaScript/React.js 
```React.js
const ProfileItem = ({ profile: {
    user: { _id, name, avatar }, 
    status, 
    company, 
    location, 
    skills
    } 
}) => {
    return <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p className='my-1'>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn btn-primary'>
                View Profile 
            </Link>
        </div>
        <ul>
            {skills.slice(0, 5).map((skill, index) => (
                <li key={index} className='text-primary'>
                    <i className='fas fa-check'></i> {skill}
                </li>
            ))}
        </ul>
    </div>; 
}
```


## Features
* Full stack web application utilizing the MERN stack: MongoDB, Express.js, React-Redux, and Node.js. 
* Authorization and authenication implemented with JWT and bcrypt. 
* Users can create account through application using Gravatar. 
* Users can add profile information, work experience, and education. 
* Explore the network by browsing other people's profiles. 

## Status
Project is: finished with option to expand functionality and DRY out code.

## Inspiration
The inspiration for GitConnect came when I realized there was a need for a network site for developers that are looking to enter the technology industry. This web application allows users to showcase their projects and experience to a group of developers alike!

