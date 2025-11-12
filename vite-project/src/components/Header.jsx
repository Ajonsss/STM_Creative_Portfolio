import check from "../assets/check.png"

const Header = ({name}) => {

    return(
        <>
        <header className="m-2 bg-[#0096FF] flex p-4 rounded-lg">
            <div className="font-black text-[20px] flex w-1/2">
                <img src={check} alt="" className="w-[30px] h-[30px]"/>
                <a href="">Home</a>
                <h1 className="pl-2">Printing Service</h1>
            </div>
            <div className="w-1/2">
                <h1 className="font-bold text-[20px] text-right pl-8">Hello {name}!</h1>
            </div>
        </header>
        </>

    );

}

export default Header;