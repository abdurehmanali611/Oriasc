import axios from "axios";
import { format } from "date-fns";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReturn } from "react-hook-form";

interface cloudinarySuccessResult {
  event: "Success";
  info: {
    secure_url: string;
    resource_type: string;
  };
}

const api = "https://oriasc-backend.vercel.app/api"

export async function ContactResponse(
  to: string | string[],
  message: string,
  title: string
) {
  try {
    const response = await axios.post(
      "/api/contact",
      {
        to,
        message,
        title,
        subject: `Response for ${title}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (data.success) {
      return { success: true, data: data.messageId || data };
    } else {
      throw new Error(data.error || "Failed to send email");
    }
  } catch (error: any) {
    console.error("Error sending email:", error);

    if (process.env.NODE_ENV === "development") {
      console.log("📧 [DEV MODE] Email would be sent:");
      console.log("To:", to);
      console.log("Subject:", `Response for ${title}`);
      console.log("Message:", message);
      return {
        success: true,
        devMode: true,
        message: "Email logged (development mode)",
      };
    }

    throw error;
  }
}

export async function AuthAdmin(
  values: any,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  router: AppRouterInstance
) {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `${api}/login`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    if (data) {
      localStorage.setItem("Password", values.Password)
      router.push("/Dashboard");
    }
    setIsLoading(false);
  } catch (error: any) {
    setIsLoading(true);
    console.log(error.message);
    setIsLoading(false);
    setError(error.message);
    setTimeout(() => {
      setError(null);
    }, 2000);
    return;
  }
}

export async function CredFetch() {
  try {
    const response = await axios.get(`${api}/GetCred`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function UpdateCred(values: any) {
  try {
    const cred = await CredFetch();
    console.log("CredFetch returned:", cred); // Debug log

    if (!cred || !Array.isArray(cred) || cred.length === 0) {
      console.log("No admin found or invalid response");
      return null;
    }

    console.log("Updating admin with ID:", cred[0].id);
    const response = await axios.patch(
      `${api}/PatchCred/${cred[0].id}`,
      {Password: values.New_Password},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function HeroPost(values: any) {
  try {
    const formattedValues = {
      ...values,
      startDate: values.startDate
        ? format(values.startDate, "yyyy-MM-dd")
        : undefined,
      endDate: values.endDate
        ? format(values.endDate, "yyyy-MM-dd")
        : undefined,
    };
    const response = await axios.post(
      `${api}/HeroPost`,
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetHero() {
  try {
    const response = await axios.get(`${api}/GetHero`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchHero(values: any, id: number) {
  try {
    const formattedValues = {
      ...values,
      startDate: values.startDate
        ? format(values.startDate, "yyyy-MM-dd")
        : undefined,
      endDate: values.endDate
        ? format(values.endDate, "yyyy-MM-dd")
        : undefined,
    };
    const response = await axios.patch(
      `${api}/PatchHero/${id}`,
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteHero(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteHero/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function ActivityPost(values: any) {
  try {
    const formattedValues = {
      ...values,
      DateTime: values.DateTime
        ? format(new Date(values.DateTime), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    };
    const response = await axios.post(
      `${api}/ActivityPost`,
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetActivity() {
  try {
    const response = await axios.get(`${api}/GetActivity`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchActivity(values: any, id: number) {
  try {
    const formattedValues = {
      ...values,
      DateTime: values.DateTime
        ? format(new Date(values.DateTime), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    };
    const response = await axios.patch(
      `${api}/PatchActivity/${id}`,
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteActivity(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteActivity/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function EventPost(values: any) {
  try {
    const featuredEvent = {
      ...values,
      StartDate: values.StartDate
        ? format(new Date(values.StartDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      EndDate: values.EndDate
        ? format(new Date(values.EndDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    };
    const response = await axios.post(
      `${api}/EventPost`,
      featuredEvent,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetEvent() {
  try {
    const response = await axios.get(`${api}/GetEvent`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchEvent(values: any, id: number) {
  try {
    const featuredEvent = {
      ...values,
      StartDate: values.StartDate
        ? format(new Date(values.StartDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      EndDate: values.EndDate
        ? format(new Date(values.EndDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    };
    const response = await axios.patch(
      `${api}/PatchEvent/${id}`,
      featuredEvent,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteEvent(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteEvent/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function BlogPost(values: any) {
  try {
    const response = await axios.post(
      `${api}/BlogPost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetBlog() {
  try {
    const response = await axios.get(`${api}/GetBlog`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchBlog(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchBlog/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteBlog(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteBlog/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function SermonPost(values: any) {
  try {
    const response = await axios.post(
      `${api}/SermonPost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetSermon() {
  try {
    const response = await axios.get(`${api}/GetSermon`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchSermon(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchSermon/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteSermon(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteSermon/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function TeamPost(values: any) {
  try {
    const response = await axios.post(
      `${api}/TeamPost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetTeam() {
  try {
    const response = await axios.get(`${api}/GetTeam`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchTeam(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchTeam/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteTeam(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteTeam/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function TestimonialPost(values: any) {
  try {
    const response = await axios.post(
      `${api}/TestimonialPost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetTestimonial() {
  try {
    const response = await axios.get(
      `${api}/GetTestimonial`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchTestimonial(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchTestimonial/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteTestimonial(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteTestimonial/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function ServicePost(values: any) {
  try {
    const response = await axios.post(
      `${api}/ServicePost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetService() {
  try {
    const response = await axios.get(
      `${api}/GetService`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchService(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchService/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeleteService(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeleteService/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function PartnerPost(values: any) {
  try {
    const response = await axios.post(
      `${api}/PartnerPost`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function GetPartner() {
  try {
    const response = await axios.get(
      `${api}/GetPartner`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PatchPartner(values: any, id: number) {
  try {
    const response = await axios.patch(
      `${api}/PatchPartner/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function DeletePartner(id: number) {
  try {
    const response = await axios.delete(
      `${api}/DeletePartner/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export async function handleCloudinary(
  result: any,
  form: UseFormReturn<any>,
  setPreviewUrl: (url: string | null) => void,
  item: string,
  setFileType?: (type: "image" | "video" | null) => void
) {
  if (
    typeof result == "object" &&
    result !== null &&
    "event" in result &&
    result.event == "success" &&
    "info" in result &&
    typeof result.info == "object" &&
    result.info !== null &&
    "secure_url" in result.info
  ) {
    const typedResult = result as cloudinarySuccessResult;
    const secured_url = typedResult.info.secure_url;
    const resource_type = typedResult.info.resource_type;

    form.setValue(item, secured_url, { shouldValidate: true });
    setPreviewUrl(secured_url);

    if (setFileType) {
      if (resource_type === "image" || resource_type === "video") {
        setFileType(resource_type as "image" | "video");
      } else {
        const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
        const isVideo = videoExtensions.some((ext) =>
          secured_url.toLowerCase().includes(ext)
        );
        setFileType(isVideo ? "video" : "image");
      }
    }
  } else {
    console.error(
      "Cloudinary Upload Failed or returned an unexpected structure."
    );

    form.setValue(item, "");
    setPreviewUrl(null);
    if (setFileType) {
      setFileType(null);
    }
  }
}
