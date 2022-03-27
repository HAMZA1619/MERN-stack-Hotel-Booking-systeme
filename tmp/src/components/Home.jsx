import React, { useEffect, useState } from "react";
import { Card, Carousel, OverlayTrigger ,Popover} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import API from "../Api";

function Home({log}) {
  const [annonces, setAnnonces] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    API.get(`hotels/annonce`).then((res) => {
      setAnnonces(res.data);
    });
  }, []);
const rederectReserve =()=>{
  if (log) {
    navigate("/reserve"); 
  } else {
    navigate("/login"); 
  }
 
}
  return (
    <div className="w-100" >
      {annonces.map((val, key1) => {
        return (
          <Carousel key={key1} className="w-100" >
            {val.image.map((img, key2) => {
              return (
                <Carousel.Item key={key2}>
                  <img
                    className="w-100 hotel-images "
                    src={process.env.PUBLIC_URL + "/images/" + img}
                    alt="slide"
                  />
                  <Carousel.Caption className="row gap-1">
                    <h2 className=" ">{val.name}</h2>
                    <h3>{val.adresse + " " + val.city}</h3>
                    {val.room.map((room, key3) => {
                      return (
                        <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={    <Popover >
                        <Popover.Body>
                          {room.image.map((roomImg ,key4)=>{
                            return(
                              <img 
                              key={key4}
                              className="w-50 h-50"
                              src={process.env.PUBLIC_URL + "/images/" + roomImg}
                              alt="slide"
                            /> 
                            )
                          })}
                        </Popover.Body>
                      </Popover>}
                      >
                        <Card
                          className="col-3 bg-transparent border-0"
                          key={key3}
                          onClick={rederectReserve}
                        >
                          <Card.Img
                            variant="top"
                            src={
                              process.env.PUBLIC_URL +
                              "/images/" +
                              room.image[0]
                            }
                            alt="slide"
                            className="h-100"
                          />
                          <Card.ImgOverlay className="d-none d-lg-block ">
                            <Card.Title>
                              Type :<strong>{room.type}</strong>
                            </Card.Title>
                            <Card.Text>
                              Price :<strong>{room.price} Dh</strong>
                            </Card.Text>                          
                          </Card.ImgOverlay>
                        </Card>
                        </OverlayTrigger>
                      );
                    })}

                    {/* <Button variant="info mt-2">See Hotel</Button> */}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        );
      })}
    </div>
  );
}

export default Home;
