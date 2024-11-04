import React from 'react'
import './Wrongpath.css'
import { Link } from 'react-router-dom';

const Wronpath = () => {
  return (
    <div className='containerreur'>
        <div className='miniconerr'>
            <div className='containtitreerr'>
                <div className='conh'><h1>It's look like you are lost in space</h1></div>
                <div className='conpppp'>
                <p>loremloremlekjrhfghjkelskejdhgfrhjkenfbjhvrebfhukevherjfvchkekchekvzfuckvlehc</p>
                </div>
                <div className='butsss'>
                  <Link to='/'>
                    <div className='butearth'><h3>get back to the earth</h3></div>
                    </Link>
                    <Link to ='/GetHelp'>
                    <div className='butearth'><h3>Get help</h3></div>
                    </Link> 
                </div>
            </div>
        
        </div>
    </div>
  )
}

export default Wronpath