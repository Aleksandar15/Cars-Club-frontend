import { Button } from "react-bootstrap";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { openModalPostAction } from "../../redux/slices/openModalPostSlice";
import CreatePostSVG from "../../utilities/icons-setup/createPost-SVG";

const CreatePostButton = () => {
  const dispatchTyped = useDispatchTyped();

  return (
    <div>
      <div className="mt-1 ms-1 mb-2 d-flex  align-items-center justify-content-space-between">
        <h4 className="text-uppercase text-info fs-4  d-flex">
          Have an offer? post yours instead
        </h4>
        <Button
          size="lg"
          className="btn-lg ms-4 mb-1 btn-outline-info bg-info "
          onClick={() => {
            dispatchTyped(openModalPostAction({ isModalPostOpen: true }));
          }}
        >
          <CreatePostSVG />
        </Button>
      </div>
    </div>
  );
};

export default CreatePostButton;
