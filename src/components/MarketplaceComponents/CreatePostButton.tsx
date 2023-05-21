import { Button } from "react-bootstrap";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { setModalPostButtonValueAction } from "../../redux/slices/modalPostButtonValueSlice";
import {
  openModalPostAction,
  selectorOpenModalPost,
} from "../../redux/slices/openModalPostSlice";
import CreatePostSVG from "../../utilities/icons-setup/createPost-SVG";

const CreatePostButton = () => {
  const dispatchTyped = useDispatchTyped();
  // Update for reusability I must pass the rest of non-empty values
  // / InitiialState's values where TypeScript helped me.
  const modalPostState = useSelectorTyped(selectorOpenModalPost);

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
            dispatchTyped(
              openModalPostAction({ ...modalPostState, isModalPostOpen: true })
            );
            dispatchTyped(
              setModalPostButtonValueAction({
                modalPostButtonValue: "CREATE A POST",
              })
            );
          }}
        >
          <CreatePostSVG />
        </Button>
      </div>
    </div>
  );
};

export default CreatePostButton;
