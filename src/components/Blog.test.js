import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "blog for test",
  author: "TL",
  url: "dfgd.com",
  likes: 4,
  user: {
    name: "TL",
    username: "tranlele",
  },
};
describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("renders Blog content", () => {
    expect(component.container).toHaveTextContent("blog for test TL");
    expect(component.container).not.toHaveTextContent("dfgd.com");
    expect(component.container).not.toHaveTextContent(4);
  });

  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("View");
    fireEvent.click(button);

    const div = component.container.querySelector(".blogDetails");
    expect(div).toHaveTextContent("dfgd.com");
    expect(div).toHaveTextContent(4);
  });
});

test("after clicking the button, children are displayed", () => {
  const mockLikeHandler = jest.fn();
  const component = render(<Blog blog={blog} updateLikes={mockLikeHandler} />);
  const viewButton = component.getByText("View");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
