'use client'

import axios from "axios"
import {useState} from "react"

export default function blogPage() {
    return (<>
    <div>
        <div><h1 className="m-20 text-2xl font-bold">Post Title</h1></div>
        <div><h1 className="m-20 text-xl">Post Date</h1></div>
        <div className="m-5 text-lg">
           <div> Lorem ipsum dolor sit amet consectetur adipiscing elit. 
            Quisque faucibus ex sapien vitae pellentesque sem placerat. 
            In id cursus mi pretium tellus duis convallis. Tempus leo eu 
            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus 
            nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia 
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti 
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</div>
        </div>
        <div className="relative rounded-sm border-2 border-black m-5 w-673 h-372 text-lg bg-gray-500">
            <div>Image</div>
        </div>
        <div className="m-5 text-lg">
           <div> Lorem ipsum dolor sit amet consectetur adipiscing elit. 
            Quisque faucibus ex sapien vitae pellentesque sem placerat. 
            In id cursus mi pretium tellus duis convallis. Tempus leo eu 
            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus 
            nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia 
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti 
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</div>
        </div>
    </div>
    </>)
}