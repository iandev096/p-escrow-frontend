import { ContactDetailApi } from "../../../api/contactDetail";
import useSWR from "swr";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth/AuthProvider";
import { IContactDetail } from "../../../models/contactDetail/contactDetail.interface";
import { CreateContactDetailDto, UpdateContactDetailDto } from "../../../models/contactDetail/contactDetail.dto";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

const contactDetailApi = new ContactDetailApi();
const useFetchContactDetail = (userId: string) => {
  const { data, error, mutate } = useSWR(
    userId ? 'getContactDetail' : null,
    () => contactDetailApi.getContactDetail(userId).then(data => data)
  );
  const isPending = !data;
  const contactDetail = data;
  const setContactDetail = mutate;

  return { contactDetail, setContactDetail, error, isPending };
}

export const useContactDetail = () => {
  const { user, logout } = useContext(AuthContext);
  const { contactDetail, setContactDetail, error, isPending } = useFetchContactDetail(user?.userId);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    contactDetailApi.setOnUnAuthHandler(() => {
      alert.show('You must login to continue');
      logout();
      router.replace('/auth');
    });
  }, []);

  const setContact = (data: IContactDetail) => {
    setContactDetail(data);
  }

  const createContactDetail = async (data: CreateContactDetailDto) => {
    try {
      const detail = await contactDetailApi.createContactDetail(data);
      setContact(detail);
    } catch (err) {
      throw err;
    }
  }

  const updateContactDetail = async (data: UpdateContactDetailDto) => {
    try {
      const detail = await contactDetailApi.updateContactDetail(data);
      setContact(detail);
    } catch (err) {
      throw err;
    }
  }

  return {
    contactDetail,
    createContactDetail,
    updateContactDetail,
    error,
    isPending,
  }
}
