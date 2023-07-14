

export default function CountBox({title,value}){
    return (
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate ">{value}</h4>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#2b2b2e] px-3 py-2 w-full rounded-b-[10px] text-center" >{title}</p>
        </div>
    )
}