// import "react-bootstrap"

export default function Footer() {
    //consume the UserContext and destructure it to access the user state from the context provider

    return (
        <footer>
            <div>
                <div className="footer-container container-fluid m-0 p-0">	
                    <div className="bg-light justify-content-between text-center">
                        <div className="footer py-3">

                            &copy; 2020 Copyright: Paula Manese <b>|</b> Web Design and Code by Paula Manese
                                                
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

