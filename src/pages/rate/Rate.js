import React from "react";

import { Card, CardGroup } from "react-bootstrap";

import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";






const Rate = (props) => {
    const { 
        owner,
        title, 
        rate, 
        price, 
        location, 
        id, 
        updated_at,
        postPage,
     } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleDelete = async () => {
        try {
          await axiosRes.delete(`/rate/${id}/`);
          history.goBack();
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <CardGroup>
      <Card>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                // handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
        </div>
      </Card>
      <Card>
        {rate && <Card.Title className="text-center">{rate}</Card.Title>}
      </Card>
      <Card>
        {location && <Card.Title className="text-center">{location}</Card.Title>}
      </Card>
      <Card>
        {price && <Card.Title className="text-center">{price}</Card.Title>}
      </Card>

    </CardGroup>
  )
};

export default Rate;