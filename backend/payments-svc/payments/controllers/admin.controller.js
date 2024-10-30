import { catchAsync } from "../utils/catchAsync.js";
import config from "../config/config.js";
import { summarySchema } from "../helpers/schemaValidation.js";
import { ApiError } from "../utils/APiError.js";
import { getSummary } from "../services/admin.service.js";

const adminSummary = catchAsync(async(req, res) => {
    const result = summarySchema.validate(req.query)
    if (result?.error) {
        const error = result.error.details[0].message;
        throw new ApiError(400, error);
      }
    const summary = await getSummary(req.query)
    return res.status(200).json(summary)
})

export default {adminSummary}