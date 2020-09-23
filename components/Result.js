import * as React from "react";
import { Card, Avatar, Paragraph } from "react-native-paper";

const Result = ({ icon, answer, question, color }) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        style={{ marginBottom: -15 }}
        title={question}
        left={() => (
          <Avatar.Icon
            size={36}
            icon={() => icon}
            style={{
              backgroundColor: color,
            }}
          />
        )}
      />
      <Card.Content style={{ marginLeft: 55 }}>
        <Paragraph>{answer}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default Result;
