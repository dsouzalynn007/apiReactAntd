import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { Dropdown } from 'antd'

const Navbar=()=>{

    const items = [
        {
          label: <Link to='/people'>People</Link>,
          key: '0',
        },
        {
            type: 'divider',
        },
        {
          label: <Link to='/country'>Countries</Link>,
          key: '1',
        },
      ];

    
    return(
        <div>
            <section id='homeMainSec'>
                <article>
                    <div className='firstDiv'>
                        <aside className='logoAside'>
                            <Link to='/'>
                                <img src="https://launchpre.com/wp-content/uploads/2021/10/dummy-logo.png" alt="logo" />
                            </Link>
                        </aside>
                        <aside className='searchAside'>
                            <input type="search" placeholder='Search api'/>
                        </aside>
                    </div>
                    <div className='secondDiv'>
                        <aside>
                            <Link to='/'>Home</Link>
                        </aside>
                        <aside>
                            Notify
                        </aside>
                        <aside>
                            <Link to='/'>Demo</Link>
                        </aside>
                        <aside>
                            <Dropdown
                            menu={{items}}
                            trigger={['click']}
                            >
                            <p onClick={(e) => e.preventDefault()}>
                            Menu
                            </p>
                            </Dropdown>
                        </aside>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Navbar