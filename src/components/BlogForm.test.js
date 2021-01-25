import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  const component = render(<BlogForm handleCreateBlog={createBlog} />);
  const author = component.container.querySelector("#author");
  const form = component.container.querySelector("form");

  fireEvent.change(author, {
    target: { value: "LeHuTran" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe("LeHuTran");
});
