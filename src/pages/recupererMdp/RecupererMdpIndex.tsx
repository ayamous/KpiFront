import FormRecuperer from './form';


const RecupererMdpIndex = ()=>{
    return (
        <div className="recupererPass container">
            <div className=" formCls ">
                <div>
                    <div className="logo">
                        <img src="./assets/images/logo-main.svg" />
                    </div>
                    <h2><span>Récupérer</span> le mot de passe</h2>
                    <FormRecuperer/>
                </div>
            </div>
        </div>
    )
}

export default RecupererMdpIndex;