import React from 'react'
import Canva3D from '../component/Canva3D'
import '../css/playground.css'

const Playground = () => {
    return (
        <>
            <div className="earth-container model-3d">
                <Canva3D name="earth" />
                    <h1 className='title first'>Earth's 3D model</h1>
                <div className="extra">
                    <h1>Hello</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti saepe expedita, error fugiat illum quam quidem pariatur hic dolores rerum incidunt ducimus quibusdam, doloribus et explicabo assumenda voluptates perspiciatis.</p>
                </div>
            </div>
            <div className="moon-container model-3d">
                <Canva3D name="moon" />
                    <h1 className='title'>Moon's 3D model</h1>
                <div className="extra">
                    <h1>Hello</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti saepe expedita, error fugiat illum quam quidem pariatur hic dolores rerum incidunt ducimus quibusdam, doloribus et explicabo assumenda voluptates perspiciatis.</p>
                </div>
            </div>
            <div className="mars-container model-3d">
                <Canva3D name="mars" />
                    <h1 className='title'>Mars 3D model</h1>
                <div className="extra">
                    <h1>Hello</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti saepe expedita, error fugiat illum quam quidem pariatur hic dolores rerum incidunt ducimus quibusdam, doloribus et explicabo assumenda voluptates perspiciatis.</p>
                </div>
            </div>
        </>


    )

}

export default Playground
