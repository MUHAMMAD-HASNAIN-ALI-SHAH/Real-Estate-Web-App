import {
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  Select,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import useListingStore from "../store/listing";
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { editListing, submitionState, getSingleListing } = useListingStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      country: "",
      address: "",
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },

    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
      category: (value) =>
        value.trim().length > 0 ? null : "Category is required",
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      country: (value) =>
        value.trim().length > 0 ? null : "Country is required",
      address: (value) =>
        value.trim().length > 0 ? null : "Address is required",
      bedrooms: (value) => (value > 0 ? null : "Must have at least 1 bedroom"),
      beds: (value) => (value > 0 ? null : "Must have at least 1 bed"),
      bathrooms: (value) =>
        value > 0 ? null : "Must have at least 1 bathroom",
    },
  });

  const handleImageChange = (file: File | null) => {
    setImage(file);
    setImageError(null);

    if (!file) {
      setImageBase64(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    const getListingData = async () => {
      const listingData = await getSingleListing(id as string);
      if (listingData) {
        form.setValues({
          title: listingData.title,
          description: listingData.description,
          category: listingData.category,
          price: listingData.price,
          country: listingData.country,
          address: listingData.address,
          bedrooms: listingData.bedrooms,
          beds: listingData.beds,
          bathrooms: listingData.bathrooms,
          images: listingData.images,
        });
        setImageBase64(listingData.image);
      }
    };
    getListingData();
  }, [getSingleListing]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!image && !imageBase64) {
      setImageError("Main image is required");
      return;
    }

    setImageError(null);

    const formData = {
      _id: id,
      ...values,
      image: imageBase64,
    };

    await editListing(formData);
    navigate("/dashboard");
  };

  return (
    <div className="px-5 md:px-10 bg-gray-100 mt-5 flex items-center justify-center">
      <form
        className="w-full md:w-[700px]"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <h1 className="font-bold text-3xl py-4">Create a Listing</h1>

        <TextInput
          label="Title"
          placeholder="Enter the title of your listing"
          withAsterisk
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Description"
          placeholder="Provide a detailed description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={["Beach", "Cabin", "Apartment", "Luxury"]}
          withAsterisk
          {...form.getInputProps("category")}
        />

        <NumberInput
          label="Price per night"
          placeholder="Enter the price"
          withAsterisk
          {...form.getInputProps("price")}
        />

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Country"
            placeholder="Enter country"
            withAsterisk
            {...form.getInputProps("country")}
          />
          <TextInput
            label="Address"
            placeholder="Enter address"
            withAsterisk
            {...form.getInputProps("address")}
          />
        </div>

        <FileInput
          label="Main Image"
          placeholder="Upload main image"
          withAsterisk
          value={image}
          onChange={handleImageChange}
          error={imageError}
        />

        {imageBase64 && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={imageBase64}
              alt="Preview"
              className="rounded-md border max-h-48"
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">

        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <NumberInput
            label="Bedrooms"
            placeholder="No. of bedrooms"
            withAsterisk
            {...form.getInputProps("bedrooms")}
          />
          <NumberInput
            label="Beds"
            placeholder="No. of beds"
            withAsterisk
            {...form.getInputProps("beds")}
          />
          <NumberInput
            label="Bathrooms"
            placeholder="No. of bathrooms"
            withAsterisk
            {...form.getInputProps("bathrooms")}
          />
        </div>

        <Group justify="flex-end" mt="md">
          <Button disabled={!!submitionState} type="submit">
            Edit Listing
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EditListing;
