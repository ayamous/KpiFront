import FormUpdate from './form';


const UpdatePasswordIndex = ()=>{
    return (
        <div className="updatePass container">
            <div className=" formCls ">
                <div>
                    <div className="logo">
                        <img src="./assets/images/logo-main.svg" />
                    </div>
                    <h2><span>Changer</span> le mot de passe</h2>
                    <FormUpdate/>
                </div>
            </div>
        </div>
    )
}

export default UpdatePasswordIndex;