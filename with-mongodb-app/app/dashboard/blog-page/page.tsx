export default function blogPage() {
    return (<>
    <div>
        <div><h1 className="m-20 text-2xl font-bold">Blog Page</h1></div>
        <div className="relative rounded-sm border-2 border-black m-20 text-lg">
           <div> Post Title<br></br><br></br>Post Text</div>
           <button className="absolute bottom-0 right-0">View Post</button>
        </div>
        <div className="relative rounded-sm border-2 border-black m-20 text-lg">
            <div>Post Title<br></br><br></br>Post Text</div>
            <button className="absolute bottom-0 right-0">View Post</button>
        </div>
        <div className="relative rounded-sm border-2 border-black m-20 text-lg">
            <div>Post Title<br></br><br></br>Post Text</div>
            <button className="absolute bottom-0 right-0">View Post</button>
        </div>
    </div>
    </>)
}