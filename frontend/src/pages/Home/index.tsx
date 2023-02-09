import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../providers/token";
import { Redirect } from "react-router-dom";
import backendApi from "../../services/backendApi";
import ContactCard from "../../components/ContatcCard";
import SearchBar from "../../components/SearchBar";
import CreateConctactButton from "../../components/CreateContactButton";
import { UpdateContext } from "../../providers/update";
import LogoutButton from "../../components/LogoutButton";

const HomePage = () => {
  const tokenCtx = useContext(TokenContext);
  const updateCtx = useContext(UpdateContext);

  const [contactsList, setContactsList] = useState<any[]>([]);
  const [showedList, setShowedList] = useState<any[]>([]);

  useEffect(() => {
    backendApi
      .get("/contacts", { headers: { Authorization: tokenCtx.token } })
      .then((res) => {
        setContactsList(res.data);
        setShowedList(res.data);
      });
  }, [updateCtx.update]);

  return (
    <div className="container">
      {!tokenCtx.token ? (
        <Redirect to="/login" />
      ) : (
        <main>
          <LogoutButton />
          <CreateConctactButton />
          <SearchBar baseArray={contactsList} setList={setShowedList} />
          {showedList.map((contact) => (
            <ContactCard key={contact.id} {...contact} />
          ))}
        </main>
      )}
    </div>
  );
};

export default HomePage;
