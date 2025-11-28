import {Oval} from "react-loader-spinner";

export default function Loader () {
    return (
        <Oval
        height="25"
        width="25"
        color="white"
        secondaryColor="black"
        ariaLabel="circle-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        />
    )
}