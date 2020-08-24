import {useQuery} from '@apollo/client';
import CURRENT_USER from "../../../../graphql/queries/currentUser";
import { User } from "../types/auth.types";

export default () => {
const { loading, data, error } = useQuery<{user: User}>(CURRENT_USER);
return {loading, auth: data, error};
}
