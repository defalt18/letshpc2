import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import { IconButton } from "@material-ui/core";
import "./Report.css";
import _map from "lodash/map";
import TextEditor from "./Texteditor";
import { updateUserProfile } from "../../../../../services/services";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../../slices/userSlice";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Report({ user, func }) {
    const [Class, setClass] = React.useState("report__page");
    const [Images, setImages] = React.useState([]);
    const [reportData, setReportData] = React.useState();
    const dispatch = useDispatch();

    const notify = () => {
        toast.success("Changes saved!", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const saveOnMongo = async () => {
        const res = await updateUserProfile({
            ...user,
            reportDoc: reportData,
        });
        dispatch(setUser({ user: res.data.user }));
        notify();
    };

    return (
        <div className={Class}>
            <Button
                id="close_icon"
                onClick={() => {
                    setClass("report__page__down");
                    setTimeout(() => {
                        func(false);
                    }, 500);
                }}
            >
                Close
            </Button>
            <IconButton
                id="close_icon__save"
                onClick={async () => {
                    await saveOnMongo();
                }}
            >
                <SaveIcon />
            </IconButton>
            <div className="recent__plots">
                <h2 className="header__side">Generated Plots</h2>
                {_map(user?.savedPlots, (item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setImages([...Images, item.imageURL]);
                        }}
                        className="plot"
                        id="plot__side"
                    >
                        <img
                            src={item.imageURL}
                            alt=""
                            style={{ backgroundColor: "white" }}
                        />
                        <h2>Figure {index + 1}</h2>
                        <p>
                            {new Date(item.createDate).toString().slice(0, 24)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="paper__show">
                <TextEditor
                    initialData={user.reportDoc}
                    saveReport={setReportData}
                />
            </div>
            <ToastContainer />
        </div>
    );
}

export default React.memo(Report);
